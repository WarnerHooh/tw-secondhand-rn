import { createActions } from 'redux-actions';

const PAYLOAD_AND_META_CREATOR = [payload => payload, (payload, meta) => meta];
const actionCreators = createActions({
  RELEASE: {
    PRODUCT: {
      SALE: {
        START: PAYLOAD_AND_META_CREATOR,
        SUCCESS: PAYLOAD_AND_META_CREATOR,
        FAILED: PAYLOAD_AND_META_CREATOR
      },
      NAME: {
        CHANGE: PAYLOAD_AND_META_CREATOR
      },
      PRICE: {
        CHANGE: PAYLOAD_AND_META_CREATOR
      },
      DESCRIPTION: {
        CHANGE: PAYLOAD_AND_META_CREATOR
      },
      IMAGE: {
        PICK: {
          PICKING: PAYLOAD_AND_META_CREATOR,
          PICKED: PAYLOAD_AND_META_CREATOR,
          FAILED: PAYLOAD_AND_META_CREATOR
        },
        UPLOAD: {
          UPLOADING: PAYLOAD_AND_META_CREATOR,
          UPLOADED: PAYLOAD_AND_META_CREATOR,
          FAILED: PAYLOAD_AND_META_CREATOR
        }
      }
    }
  }
});

export default actionCreators;
