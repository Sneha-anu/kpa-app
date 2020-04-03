import React, { useState, useEffect, useRef } from "react";
import Box from "@material-ui/core/Box";
// import { CSVLink } from "react-csv";
import { makeStyles } from "@material-ui/core/styles";
import NativeSelect from "@material-ui/core/NativeSelect";
import queryString from "query-string";

import { FilterBYType, FilterByName } from "../../Shared/function";
import RowList from "./rowList";
import SnackBar from "../../Shared/component/snackBar";
// import TitleHeaders from "./titleBoard";
import { FormLabel } from "@material-ui/core";
import { fetchUserProfile, updateUserProfile } from "../../service/apiService";
import BackDrop from "../../Shared/component/backDrop";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 220
  },
  selectEmpty: {
    margin: theme.spacing(2)
  }
}));

const Dashboard = props => {
  const { location } = props;
  const queryParam = queryString.parse(location.search);
  const [showBy, setshowBy] = useState({ type: "" });
  const [data, setData] = useState([]);
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();
  const snackBarRef = useRef();

  const handleChange = event => {
    const name = event.target.name;
    setshowBy({
      [name]: event.target.value
    });

    // for (let id in queryParam) {
    //   return history.push({
    //     pathname: "/kpa-profile",
    //     search: `?${id}=${event.target.value}`
    //   });
    // }
  };

  async function changeStage(result) {
    setIsLoading(true);
    const event = result["draggableId"].split("~");
    const changeArr = data
      .filter(el => el.id === parseInt(event[0]))
      .map(user => {
        return user.kpa.map(list => {
          return list.type === event[2] && list.title === event[1]
            ? { ...list, stage: result.destination.droppableId }
            : list;
        });
      })
      .flat();
    try {
      const res = await updateUserProfile(`/profile/${event[0]}`, {
        kpa: changeArr
      });
      setData(previous => {
        return previous.map(el =>
          el.id === parseInt(event[0]) ? res.data : el
        );
      });
      snackBarRef.current.handleClick(
        `Profile ${event[0]} updated Successfully`,
        "success"
      );
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        snackBarRef.current.handleClick(error.message, "error");
        console.log(error.toJSON());
      }
    }
    setIsLoading(false);
  }

  async function fetchData() {
    setIsLoading(true);
    try {
      const response = await fetchUserProfile();
      setData(response.data);

      if ("id" in queryParam) {
        setOptions(response.data.map(el => el.id));
        setshowBy({ type: queryParam.id });
      } else if ("type" in queryParam) {
        response.data.forEach(element => {
          setOptions(Object.keys(element.target_kpa));
          setshowBy({ type: queryParam.type });
          console.log(Object.keys(element.target_kpa));
        });
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        snackBarRef.current.handleClick(error.message, "error");
        console.log(error.toJSON());
      }
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [props.location.search]);

  const record =
    "id" in queryParam
      ? FilterByName(data, showBy.type)
      : FilterBYType(data, showBy.type);
  const renderList = () => {
    return record.map(list => {
      return (
        <Box m={1} key={list[0] + showBy.type}>
          <RowList
            data={list[1]}
            id={list[0]}
            changeStage={changeStage}
            status={list[2]}
          />
        </Box>
      );
    });
  };

  return (
    <React.Fragment>
      {/* <CSVLink
        className="card bg-warning text-light p-3 mb-2"
        data={initialData}
        headers={headers}
      >
        Click me to Download CSV Format
      </CSVLink>*/}
      <Box
        borderRadius="borderRadius"
        display="flex"
        flexDirection="row"
        justifyContent="flex-end"
        alignItems="center"
        m={1}
        bgcolor="background.paper"
      >
        <FormLabel>Show By</FormLabel>
        <NativeSelect
          value={showBy.type}
          onChange={handleChange}
          name="type"
          className={classes.selectEmpty}
          inputProps={{ "aria-label": "age" }}
        >
          {options.map(el => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
        </NativeSelect>
      </Box>

      {/* <TitleHeaders titleTopic={titleTopic} /> */}
      {isLoading && <BackDrop open={isLoading} />}
      {renderList()}
      <SnackBar ref={snackBarRef} />
      {/* {isLoading ? <BackDrop open={isLoading} /> : renderList()} */}
    </React.Fragment>
  );
};

export default Dashboard;
