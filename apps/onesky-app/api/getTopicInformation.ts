const getTopicInformation = (quizTopic: string) => {
  return {
    question: 'How do synthetic clothes contribute to microplastics?',
    answers: [
      'They release fibres that enter waterways when washed',
      'They attract glitter from the air',
      'When they are exposed to sunlight',
      'If they are left in washing basket for too long',
    ],
    rightAnswerIndex: 2,
    quizContext: [
      'Synthetic fabrics like polyester release microfibres when washed.',
      'These microplastics go down the drain and often end up in waterways.',
      'Washing bags or filters can reduce the amount released.',
    ],
  };
};

export default getTopicInformation;
