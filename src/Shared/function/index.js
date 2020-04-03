import { groupBy, countBy, maxBy, orderBy} from "lodash";
import { kpaModel } from "../function/initialData";

export const getGroupingKpa = arr => {
  return arr
    .map(el => {
      return el.kpa.map(item => {
        return {
          ...item,
          id: el.id,
          name: el.name,
          designation: el.designation
        }; //   /Object.assign({}, item, { id: el.id })
      });
    })
    .flat(Infinity);
};

export const dataGroupByStage = arr => {
  var group = groupBy(arr, "stage");
  var res = {};
  for (let item in group) {
    res[item] = {
      id: item,
      title: item,
      taskIds: group[item]
    };
  }
  return res;
};

export const dataGroupForCompletedKPA = (arr, kpaStage) => {
  
  var res = getGroupingKpa(arr);
  console.log(res, "grouping KPA")
  res = groupBy(res, "id");
  var groupedRes = [];

  for(let item in res)
  {
    let name;
    let target;
    arr.map(data => {
      if(data.id.toString() === item){
        name = data.name;
        target = data.target_kpa;
      }
    });
    let data = {};
    let groupByType = groupBy(res[item], "type");
    for(let groupType in groupByType){
      const filterdKPA = kpaStage.find(kpasta => kpasta.name === groupType);
      const completedStage = filterdKPA && filterdKPA.stage.length.toString();
      data[groupType] = groupByType[groupType].filter(fData => fData.stage === completedStage).length;
    }
    groupedRes.push({
      completed: data,
       name ,target
    })
  }
  return groupedRes;
}

export const FilterBYType = (arr, type = "component") => {
  var res = getGroupingKpa(arr);
  res = res.filter(el => el.type === type);

  var kpastage = {};
  var target;
  kpaModel
    .filter(el => el.name === type)
    .forEach(list => {
      target = list.stage.length;
      list.stage.forEach(item => {
        kpastage[item.id] = { ...item, taskIds: [] };
      });
    });
  res = Object.entries(groupBy(res, "name")).map(el => {
    const dataGroupByStageProp = dataGroupByStage(el[1]);
    const countKPA = { pending: 0 };
    arr
      .filter(ite => ite.name === el[0])
      .forEach(val => {
        countKPA.target = val.target_kpa[type];
      });
    for (const [key, value] of Object.entries(dataGroupByStageProp)) {
      parseInt(value.id) === target
        ? (countKPA["completed"] = value.taskIds.length)
        : (countKPA.pending = countKPA.pending + value.taskIds.length);
    }

    return [[el[0]], { ...kpastage, ...dataGroupByStageProp }, countKPA];
  });
  return res;
};

export const getKPATitle = (type = "component") => {
  var kpastage = {};
  kpaModel
    .filter(el => el.name === type)
    .forEach(list => {
      list.stage.forEach(item => {
        kpastage[item.id] = { ...item };
      });
      //console.log(...stage,'item')
    });
  return kpastage;
};

export const FilterByName = (arr, id = 51827270) => {
  var res = getGroupingKpa(arr);
  res = res.filter(el => el.id === parseInt(id));

  var target;
  res = Object.entries(groupBy(res, "type")).map(el => {
    const dataGroupByStageProp = dataGroupByStage(el[1]);
    const countKPA = { pending: 0 };
    let kpastage = {};
    kpaModel
      .filter(kpa => kpa.name === el[0])
      .forEach(list => {
        target = list.stage.length;
        list.stage.forEach(item => {
          kpastage[item.id] = { ...item, taskIds: [] };
        });
      });

    arr
      .filter(ite => ite.id === parseInt(id))
      .forEach(val => {
        countKPA.target = val.target_kpa[el[0]];
      });
    for (const [key, value] of Object.entries(dataGroupByStageProp)) {
      parseInt(value.id) === target
        ? (countKPA["completed"] = value.taskIds.length)
        : (countKPA.pending = countKPA.pending + value.taskIds.length);
    }

    return [[el[0]], { ...kpastage, ...dataGroupByStageProp }, countKPA];
  });
  return res;
};

export const fetchCountOverAll = arr => {
  //  var filteredArr = getGroupingKpa(arr);

  var countByType = countBy(arr, "type");
  var res = [];
  for (let id in countByType) {
    res.push({ name: id, value: countByType[id] });
  }
  return res;
};

export const getRecentKPAModification = arr => {
  var filteredArr = getGroupingKpa(arr);
  var date = new Date();
  date.setDate(date.getDate() - 30);
  filteredArr = orderBy(filteredArr, ["modified_on"], ["desc"]);
  return filteredArr.filter(el => new Date(el.modified_on) >= date).slice(0, 4);
};

export const getKPAType = type => {
  switch(type){
    case "case_study":
      return "Case Study";
    case "Tech_session":
      return "Tech Session";
    case "Master_class":
      return "Master Class";
    case "component":
      return "Component";
    default:
      return "";
  }
};

export const compTarget = (arr, type = "component") => {
  var res = arr.filter(el => el.type === type);
  var kpastage = {}, tmCount, tlCount ,teCount;
  kpaModel
    .filter(el => el.name === type)
    .forEach(list => {
      list.target.forEach(item => {
       if(item.title == 'tm') { const tmCount = item.count; }
       else if(item.title == 'tl') { const tlCount = item.count; }
       else if(item.title == 'te') { const teCount = item.count; }
      });
     console.log(tmCount, tlCount, teCount)
    });

  return res;
};

export const totalKpa = arr => {
  var arr = arr.filter((arr, index, self) =>
    index === self.findIndex((t) => (t.name === arr.name)))

  var totalTm = arr.filter(el => el.designation === "TM");
  var totalTm = totalTm.length;

  var totalTl = arr.filter(el => el.designation === "TL");
  var totalTl = totalTl.length;

  var totalTe = arr.filter(el => el.designation === "TE");
  var totalTe = totalTe.length;

  var totalComponent = (totalTm * 6) + (totalTl * 4) + (totalTe * 2);
  var totalMaster = (totalTm * 4) + (totalTl * 3) + (totalTe * 2);
  var totalTechsession = (totalTm * 3) + (totalTl * 2) + (totalTe * 1);
  return [totalComponent, totalMaster, totalTechsession];
};

/**COMPONENT**/
export const componentCompleted = (arr, type = "component") => {
  console.log(arr)
  var res = arr.filter(el => el.type === type && el.stage === '4');
  return res.length;
};

/**MASTER CLASS**/
export const masterCompleted = (arr, type = "Master_class") => {
  var res = arr.filter(el => el.type === type && el.stage === '4');
  return res.length;
};

/**TECHSESSION**/
export const techsessionCompleted = (arr, type = "Tech_Session") => {
  var res = arr.filter(el => el.type === type && el.stage === '4');
  return res.length;
};
