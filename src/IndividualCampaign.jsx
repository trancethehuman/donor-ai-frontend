import DonorCard from "./DonorCard";
import { TestDonorList } from "./consts";

const IndividualCampaign = () => {
  return (
    <div>
      {TestDonorList.map((donor, index) => (
        <DonorCard
          name={donor.name}
          key={index}
          major={donor.major}
          home={donor.city}
          year={donor.year}
        />
      ))}
    </div>
  );
};

export default IndividualCampaign;
