const Info = ({ ...props }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
      {...props}
    >
      <circle cx="12" cy="12" r="10" fill="transparent" />
      <path d="M12 8v4" stroke="white" />
      <path d="M12 16h.01" stroke="white" />
    </svg>
  )
}

export default Info
