const fs = require('fs');
const _ = require('lodash');
const glob = require('glob');

const flag = process.argv.slice(2)[0];

if (flag === '--split') {
  split();
} else if (flag === '--join') {
  join();
}

function split() {
  let flowsAll = fs.readFileSync(0, 'utf8');
  flowsAll = JSON.parse(flowsAll);

  // console.log(flowsAll);

  let tabs = flowsAll.filter(x => x.type === 'tab');

  let tabFlows = tabs.map(tab => {
    let nodes = flowsAll.filter(x => x.z === tab.id);
    return [tab].concat(nodes);
  });

  // console.log(tabFlows);

  let tabFlowsFlattened = tabFlows.reduce((a, b) => a.concat(b), []);

  // console.log(tabFlowsFlattened.length, flowsAll.length);

  let miscFlows = _.differenceBy(flowsAll, tabFlowsFlattened, 'id');

  // console.log(miscFlows);

  // TODO: Validate before save
  // console.log(
  //   _.sortBy([...tabFlowsFlattened, ...miscFlows], x => x.id).map(x => x.id)
  // );
  // console.log(_.sortBy(flowsAll, x => x.id).map(x => x.id));
  // console.log(flowsAll.length);

  console.assert(
    _.isEqual(
      _.sortBy([...tabFlowsFlattened, ...miscFlows], x => x.id).map(x => x.id),
      _.sortBy(flowsAll, x => x.id).map(x => x.id)
    )
  );

  tabFlows.forEach(tab => {
    let label = tab.filter(x => x.type === 'tab')[0].label;
    fs.writeFileSync(
      `${__dirname}/flows/flows/${label}.json`,
      JSON.stringify(tab, null, '  '),
      'utf8'
    );
  });

  fs.writeFileSync(
    `${__dirname}/flows/flows-misc.json`,
    JSON.stringify(miscFlows, null, '  '),
    'utf8'
  );
}

function join() {
  let result = [];
  glob(`${__dirname}/flows/flows/*.json`, {}, (er, filenames) => {
    filenames.forEach(filename => {
      let data = JSON.parse(fs.readFileSync(filename, 'utf8'));
      result = result.concat(data);
    });
    let miscData = JSON.parse(
      fs.readFileSync(`${__dirname}/flows/flows-misc.json`, 'utf8')
    );
    result = result.concat(miscData);
    console.log(JSON.stringify(result, null, '  '));
    // console.log(result.length);
  });
}
