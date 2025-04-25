import PropTypes from 'prop-types';
import './no-sleep.scss';
import { ReactComponent as IconChecked} from '../../images/icons/svg/icon_checked.svg';
import { ReactComponent as IconUnchecked} from '../../images/icons/svg/icon_unchecked.svg';
import NoSleep from 'nosleep.js';

const NoSleepToggle = (props) => {

  function toggleNoSleep(e) {
    props.onToggle();
  }

  let noSleep = new NoSleep();
  if (props.isActive) {
    noSleep.enable();
  } else {
    noSleep.disable();
  }

  return (
    <div className="no-sleep__container" onClick={toggleNoSleep} role="button" aria-label={props.isActive ? 'Ne plus empêcher la mise en veille' : 'Empêcher la mise en veille de l\'écran'}>
      <span className="no-sleep__picto-container" >{props.isActive && <IconChecked />}{!props.isActive && <IconUnchecked />}</span>
      <span className="no-sleep__text">Empêcher la mise en veille de l'écran</span>
    </div>
  );
}

NoSleepToggle.propTypes = {
  onToggle: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired
};

NoSleepToggle.defaultProps = {};

export default NoSleepToggle;
