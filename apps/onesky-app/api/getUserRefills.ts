// refills prop is only here so that the refill progression still works without backend data
const getUserRefills = (refills: number) => {
  return {
    userRefills: refills,
  };
};

export default getUserRefills;
