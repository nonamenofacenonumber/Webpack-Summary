const notifier = require('node-notifier');
class Notifier {
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        console.log('my first plugin ', this.options);
        compiler.hooks.done.tap('notification', (stats) => {
            let time = ((stats.endTime - stats.startTime) / 1000).toFixed(2);
            notifier.notify({
                title: 'Saeed\'s Webpack',
                message: `webpack is done in ${time}`
            });
        })
    }
}
module.exports = Notifier;