import PropTypes from 'prop-types';

function PlansModal({ setPlanModal }) {
    return (
        <>
        <div>
            PlansModal
        </div>
        <button
            onClick={() => {
                setPlanModal(false);
            }}>
            x
        </button>
        </>
    )
}

PlansModal.propTypes = {
    setPlanModal: PropTypes.bool.isRequired,
};

export default PlansModal;
