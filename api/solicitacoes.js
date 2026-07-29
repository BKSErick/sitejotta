import siteWorker from '../sites/server/index.js';

export default {
  fetch(request) {
    return siteWorker.fetch(request, process.env);
  },
};
