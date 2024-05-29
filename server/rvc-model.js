const { InferenceSession } = require('onnxruntime-node');
const path = require('path');

let rvcSession;

const loadRVCModel = async () => {
  if (!rvcSession) {
    const modelPath = path.join(__dirname, 'path/to/your/rvc-model.onnx');
    rvcSession = await InferenceSession.create(modelPath);
  }
};

const processRVC = async (audioBuffer) => {
  await loadRVCModel();
  
  const inputTensor = new Float32Array(audioBuffer);
  const tensor = new rvcSession.Tensor('float32', inputTensor, [1, inputTensor.length]);

  const results = await rvcSession.run({ input: tensor });
  const output = results.output.data;

  return output;
};

module.exports = { processRVC };