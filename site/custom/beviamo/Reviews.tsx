import { Rating } from '@components/ui'

const Reviews = ({ data }: any) => {
    return (
        <div>
            <ReviewMenu data={data} />
            <ReviewContent data={data} />
        </div>
    )
}

const ReviewMenu = ({ data }: any) => {
    
    const nofReviews = data.reviews.length
    const nofQuestions = data.questions.length

    return (
        <div className='flex flex-col md:flex-row justify-between mb-4'>
            <div className='flex'>
                <div className='text-2xl font-semibold border-black border-b-2 mr-4'>
                    Avaliações <span className='font-normal'>{nofReviews}</span>
                </div>
                <div className='text-2xl font-semibold px-2 border-black border-b-2 mr-2'>
                    Perguntas <span className='font-normal'>{nofQuestions}</span>
                </div>
            </div>
            <div className='flex'>
                {
                    ['Avaliar', 'Perguntar'].map(text => {
                        return (
                            <div className='
                                border-black border font-semibold px-4 p-2 rounded-xl 
                                mr-2 md:mr-0 md:ml-2 mt-4 md:mt-0
                            '>
                                {text}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

const ReviewContent = ({ data }: any) => {
    return (
        <div className='grid md:grid-cols-2 gap-4 mb-8'>
            {
                data.reviews.map((review: any) => {
                    return (
                        <div className='border border-black rounded-xl p-4 pt-0 flex flex-col'>
                            <Rating value={review.rating} />
                            <div className='mb-2 flex-grow'>{review.review}</div>
                            <div>Enviado por {review.reviewer}</div>
                        </div>                        
                    )
                })
            }
        </div>
    )
}

export default Reviews