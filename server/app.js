const hook = require('../shared/componentHook');

class App {
  constructor({path}) {
    this.collectors = [];
    this.collectorsMap = {};
    this.path = path;
    hook.bindComponentDidImport(this.componentDidImport.bind(this));
    hook.bindComponentDidConstruct(this.componentDidConstruct.bind(this));
  }

  componentDidImport(id, component) {
    this.collectors.forEach(collector => {
      if (collector.ifEnter(component) && collector.componentDidImport) {
        collector.componentDidImport(id, component);
      }
    });
  }

  componentDidConstruct(id, component, props) {
    this.collectors.forEach(collector => {
      if (collector.ifEnter(component) && collector.componentDidConstruct) {
        collector.componentDidConstruct(id, component, props);
      }
    });
  }

  async routeWillRender(route) {
    for (let i = 0; i < this.collectors.length; i++) {
      if (this.collectors[i].routeWillRender) {
        await this.collectors[i].routeWillRender(route);
      }
    }
  }

  registerCollector(key, collector) {
    this.collectors.push(collector);
    this.collectorsMap[key] = collector;
  }

  getCollector(key) {
    return this.collectorsMap[key];
  }

  import() {
    return require(this.path);
  }

  appWillRender() {
    return Promise.all(this.collectors.map(collector =>
      collector.appWillRender ? collector.appWillRender() : Promise.resolve()));
  }
}

module.exports = App;
