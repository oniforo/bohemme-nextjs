interface ITitle {
    text: string
}

const Title = ({text}: ITitle) => {
    const style = 'font-bold text-2xl lg:text-4xl mb-8'
    return <div className={style}>{text}</div>
}

export default Title