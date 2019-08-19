// We import date-fns to showcase that date-fns is loaded dynamically when we load the component.
import { format } from 'date-fns';

export default function showToday(element) {
  const today = new Date();
  element.innerHTML = 'Today is a ' + format(today, 'dddd');
}