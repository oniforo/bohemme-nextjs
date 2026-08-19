#!/usr/bin/env node
/**
 * Kills every leftover node process spawned by `pnpm dev` for this repo.
 *
 * `turbo run dev` fans a single `pnpm dev` invocation out into one process
 * per workspace package (a `taskr` watcher each, plus `next dev`). Stopping
 * the terminal that started it doesn't always cascade to all of them on
 * Windows (pnpm's `.cmd` shims spawn each script through its own `cmd.exe`
 * wrapper), which leaves orphaned watchers running and racing with the next
 * `pnpm dev` you start. This walks the process table for anything whose
 * command line points inside this repo and kills it, skipping this script's
 * own process.
 */

const { execSync } = require('child_process')
const path = require('path')

const repoRoot = path.resolve(__dirname, '..')

function killWindows() {
  const raw = execSync(
    'wmic process where "name=\'node.exe\'" get ProcessId,CommandLine',
    { encoding: 'utf8' }
  )

  const pids = raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => line.toLowerCase().includes(repoRoot.toLowerCase()))
    .map((line) => {
      const match = line.match(/(\d+)\s*$/)
      return match ? Number(match[1]) : null
    })
    .filter((pid) => pid && pid !== process.pid)

  killAll(pids, (pid) => `taskkill /PID ${pid} /F`)
}

function killPosix() {
  const raw = execSync('ps -eo pid,args', { encoding: 'utf8' })

  const pids = raw
    .split('\n')
    .slice(1)
    .map((line) => line.trim())
    .filter((line) => line.includes(repoRoot))
    .map((line) => Number(line.split(/\s+/)[0]))
    .filter((pid) => pid && pid !== process.pid)

  killAll(pids, (pid) => `kill -9 ${pid}`)
}

function killAll(pids, commandFor) {
  const unique = [...new Set(pids)]

  if (unique.length === 0) {
    console.log('No leftover dev processes found.')
    return
  }

  for (const pid of unique) {
    try {
      execSync(commandFor(pid), { stdio: 'ignore' })
      console.log(`Killed PID ${pid}`)
    } catch {
      // Already gone by the time we got to it — not an error.
    }
  }

  console.log(`Done. Terminated ${unique.length} process(es).`)
}

if (process.platform === 'win32') {
  killWindows()
} else {
  killPosix()
}
