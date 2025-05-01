function generateDoctorExtras() {
  const profileImages = [
    "https://images.apollo247.in/doctors/6fa84b84-3da4-495d-8862-651e49e3d406-1704301126434.png?tr=w-74,c-at_max,f-auto,q=80,dpr-2",
    "https://images.apollo247.in/doctors/9edf0983-9429-4ca0-98dc-630408f23dd9-1743505194166.jpg?tr=w-74,c-at_max,f-auto,q=80,dpr-2",
    "https://images.apollo247.in/doctors/e5be4bd5-856c-4d81-9756-679f090b5108-1734242539985.jpg?tr=q-60,f-auto,w-100,dpr-1,c-at_max",
    "https://images.apollo247.in/images/consult_home/icons/female.png?tr=q-60,f-auto,w-100,dpr-1,c-at_max",
    "https://images.apollo247.in/doctors/c96893cc-8bfb-4a53-9cd5-c7b76ac35b8d-1733308738632.jpg?tr=q-60,f-auto,w-100,dpr-1,c-at_max",
  ];

  const randomTime = () => {
    const isMinutes = Math.random() < 0.7;
    if (isMinutes) {
      const mins = Math.floor(Math.random() * 45) + 5;
      return `Available in ${mins} mins`;
    } else {
      const hours = Math.floor(Math.random() * 3) + 1;
      return `Available in ${hours} hour${hours > 1 ? "s" : ""}`;
    }
  };

  return {
    rating_percentage: Math.floor(Math.random() * 21) + 80, // 80–100%
    patient_count: Math.floor(Math.random() * 900) + 100, // 100–999
    profile_image:
      profileImages[Math.floor(Math.random() * profileImages.length)],
    online_slot_time: randomTime(),
    visit_slot_time: randomTime(),
    visit_fee: [300, 500, 700, 1000][Math.floor(Math.random() * 4)],
  };
}
export default generateDoctorExtras;
