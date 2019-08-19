// We import lodash to showcase that lodash is loaded dynamically when we load the component.
import { shuffle } from 'lodash';

const Shuffle = {
  shuffle(element) {
    element.innerHTML = shuffle(element.words.split(' '));
  },
};
export default Shuffle.shuffle;