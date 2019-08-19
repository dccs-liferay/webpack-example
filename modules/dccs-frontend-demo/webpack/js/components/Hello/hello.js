// We just export a trivial function here without dependencies
export default function greet(element) {
  console.log('Greet was called');
  element.innerHTML = `<h1>Hello world!!</h1>`;
}
