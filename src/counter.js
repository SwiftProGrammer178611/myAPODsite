let count = 0;

function increment() {
  count++;
  console.log(`Count: ${count}`);
  return count;
}

function decrement() {
  count--;
  console.log(`Count: ${count}`);
  return count;
}

function reset() {
  count = 0;
  console.log('Count reset to 0');
  return count;
}

function getCount() {
  return count;
}

export { increment, decrement, reset, getCount };
