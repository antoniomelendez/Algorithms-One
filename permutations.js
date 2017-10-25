const swap = (a, b) => {
  let temp = a;
  a = b;
  b = temp;
};

const generateAll = (elements, dataSet) => {
  if (elements === 1) {
     console.log(dataSet);
  } else {
    for (let i = 0; i < elements - 1; i++) {
      generateAll(elements - 1, dataSet);
      if (elements % 2 === 0) {
        // swap(dataSet[i], dataSet[elements - 1]);
        let x = dataSet[i];
        dataSet[i] = dataSet[elements - 1];
        dataSet[elements - 1] = x;
      } else {
        // swap(dataSet[0], dataSet[elements - 1]);
        let x = dataSet[0];
        dataSet[0] = dataSet[elements - 1];
        dataSet[elements - 1] = x;
      }
    }
    generateAll(elements - 1, dataSet);
  }
};

generateAll(3,[1,2,3]);
