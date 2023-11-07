
const prompter = (text: string, callback: () => void, deniedCallback?: () => void) => {
  if(window.confirm(text)) {
    callback();
  } else {
    deniedCallback && deniedCallback();
  }
}

export default prompter;