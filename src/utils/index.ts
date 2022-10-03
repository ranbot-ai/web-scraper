const sleep = (ms: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  })
}

const asyncForEach = async (array: any, callback: any): Promise<any> => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export { sleep, asyncForEach }