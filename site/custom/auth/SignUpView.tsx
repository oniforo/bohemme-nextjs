import { FC, useEffect, useState, useCallback } from 'react'
import { validate } from 'email-validator'
import { Info } from '@components/icons'
import { useUI } from '@components/ui/context'
import { /* Logo,  */Button, Input } from '@components/ui'
import { Logo } from '@custom/ui'
import useSignup from '@framework/auth/use-signup'

interface Props {}

const SignUpView: FC<Props> = () => {
  // Form State
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [dirty, setDirty] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const signup = useSignup()
  const { setModalView, closeModal } = useUI()

  const handleSignup = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()

    if (!dirty && !disabled) {
      setDirty(true)
      handleValidation()
    }

    try {
      setLoading(true)
      setMessage('')
      await signup({
        email,
        firstName,
        lastName,
        password,
      })
      closeModal()
    } catch ({ errors }) {
      console.error(errors)
      if (errors instanceof Array) {
        setMessage(errors.map((e: any) => e.message).join('<br/>'))
      } else {
        setMessage('Unexpected error')
      }
      setDisabled(false)
    } finally {
      setLoading(false)
    }
  }

  const handleValidation = useCallback(() => {
    // Test for Alphanumeric password
    const validPassword = /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)

    // Unable to send form unless fields are valid.
    if (dirty) {
      setDisabled(!validate(email) || password.length < 7 || !validPassword)
    }
  }, [email, password, dirty])

  useEffect(() => {
    handleValidation()
  }, [handleValidation])

  return (
    <form
      onSubmit={handleSignup}
      className="w-80 flex flex-col justify-between p-3"
    >
      <div className="flex justify-center pb-8">
        <Logo width="64px" height="64px" />
      </div>
      <div className="flex flex-col space-y-4">
        {message && (
          <div
            className="text-red border border-red p-3"
            dangerouslySetInnerHTML={{
              __html: message,
            }}
          ></div>
        )}
        <Input placeholder="Nome" onChange={setFirstName} />
        <Input placeholder="Sobrenome" onChange={setLastName} />
        {/* Adicionar campo para telefone */}
        <Input type="email" placeholder="Email" onChange={setEmail} />
        <Input type="password" placeholder="Senha" onChange={setPassword} />
        <span className="">
          <span className="inline-block align-middle ">
            <Info width="15" height="15" />
          </span>{' '}
          <span className="leading-6 text-sm">
            {/* <strong>Info</strong>:  */}As senhas devem conter números e terem pelo menos 8 caracteres.{' '}
          </span>
        </span>

        <span className="">
          <span className="inline-block align-middle ">
            <Info width="15" height="15" />
          </span>{' '}
          <span className="leading-6 text-sm">
            A proteção de dados é nossa prioridade. Para obter mais informações sobre como tratamos os seus dados, acesse nossa Política de Privacidade.{' '}
          </span>
        </span>

        <div className="pt-2 w-full flex flex-col">
          <Button
            variant="slim"
            type="submit"
            loading={loading}
            disabled={disabled}
            className='bg-white text-black rounded-lg'            
          >
            Criar Conta
          </Button>
        </div>

        <span className="pt-1 text-center text-sm">
          <span>Já possui uma conta?</span>
          {` `}
          <a
            className="font-bold hover:underline cursor-pointer"
            onClick={() => setModalView('LOGIN_VIEW')}
          >
            Entrar
          </a>
        </span>
      </div>
    </form>
  )
}

export default SignUpView
