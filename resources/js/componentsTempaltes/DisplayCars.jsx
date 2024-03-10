import { useState, useEffect } from 'react';

const FeedbackCard = ({ make, model, price, year, photos }) => (

  <div className="flex justify-between flex-col px-10 py-12 rounded-[20px]  max-w-[370px] md:mr-10 sm:mr-5 mr-0 my-5 feedback-card">
    {photos.map((photo) => (
      <img key={photo.id} src={'storage/' + photo.url} alt={`Car Photo ${photo.id}`} className="w-[450px] h-[200px] rounded-md mr-2 mb-2" />
    ))}

    <div className="flex flex-row">
    {photos.map((photo) => (
      <img key={photo.id} src={'storage/' + photo.url} alt={`Car Photo ${photo.id}`} className="w-[48px] h-[48px] rounded-full" />
    ))}
      <div className="flex flex-col ml-4">
        <h4 className="font-poppins font-semibold text-[20px] leading-[32px] text-white">
        {make}
        </h4>
        <p className="font-poppins font-normal text-[16px] leading-[24px] text-dimWhite">
         {model}
        </p>
        <p className="font-poppins font-normal text-[16px] leading-[24px] text-dimWhite">
           {year}
        </p>
        <p className="font-poppins font-normal text-[16px] leading-[24px] text-dimWhite">
         {price}
        </p>
      </div>
    </div>
  </div>
);

const Clients = () => {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('api/displayCars');
        const data = await response.json();
        setFeedback(data);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };
    fetchData();
  }, []);


  return (
    <section className="flex justify-center my-4">
      <div className="flex flex-wrap w-full">
        {feedback.map((card) => (
          <FeedbackCard
            key={card.id}
            make={card.make}
            model={card.model}
            price={card.price}
            year={card.year}
            photos={card.photos}

          />
        ))}
      </div>
    </section>
  );
};

export default Clients;
