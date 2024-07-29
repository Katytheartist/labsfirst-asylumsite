import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import CitizenshipMapAll from './Graphs/CitizenshipMapAll';
import CitizenshipMapSingleOffice from './Graphs/CitizenshipMapSingleOffice';
import TimeSeriesAll from './Graphs/TimeSeriesAll';
import OfficeHeatMap from './Graphs/OfficeHeatMap';
import TimeSeriesSingleOffice from './Graphs/TimeSeriesSingleOffice';
import YearLimitsSelect from './YearLimitsSelect';
import ViewSelect from './ViewSelect';
import axios from 'axios';
import { resetVisualizationQuery } from '../../../state/actionCreators';
//import test_data from '../../../data/test_data.json';
import { colors } from '../../../styles/data_vis_colors';
import ScrollToTopOnMount from '../../../utils/scrollToTopOnMount';

const { background_color } = colors;
  //main url 
  const mainUrl = 'https://hrf-asylum-be-b.herokuapp.com/cases'; 

function GraphWrapper(props) {
  const { set_view, dispatch } = props;
  let { office, view } = useParams();
  if (!view) {
    set_view('time-series');
    view = 'time-series';
  }
  let map_to_render;
  if (!office) {
    switch (view) {
      case 'time-series':
        map_to_render = <TimeSeriesAll />;
        break;
      case 'office-heat-map':
        map_to_render = <OfficeHeatMap />;
        break;
      case 'citizenship':
        map_to_render = <CitizenshipMapAll />;
        break;
      default:
        break;
    }
  } else {
    switch (view) {
      case 'time-series':
        map_to_render = <TimeSeriesSingleOffice office={office} />;
        break;
      case 'citizenship':
        map_to_render = <CitizenshipMapSingleOffice office={office} />;
        break;
      default:
        break;
    }
  }

  //fetch data from api and update state
  async function updateStateWithNewData(
    years, 
    view, 
    office, 
    stateSettingCallback) {
    /*
          _                                                                             _
        |                                                                                 |
        |   Example request for once the `/summary` endpoint is up and running:           |
        |                                                                                 |
        |     `${url}/summary?to=2022&from=2015&office=ZLA`                               |
        |                                                                                 |
        |     so in axios we will say:                                                    |
        |                                                                                 |     
        |       axios.get(`${url}/summary`, {                                             |
        |         params: {                                                               |
        |           from: <year_start>,                                                   |
        |           to: <year_end>,                                                       |
        |           office: <office>,       [ <-- this one is optional! when    ]         |
        |         },                        [ querying by `all offices` there's ]         |
        |       })                          [ no `office` param in the query    ]         |
        |                                                                                 |
          _                                                                             _
                                   -- Mack 
    
    */                       


  try{
    //create holders for our new data we will grab
    let fiscalData = {};
    let citizenshipData = {};

    console.log('fiscal data:', fiscalData);
    console.log('citizenship data:', citizenshipData);

    //fetch all fiscal data if no office selected
    if (office === 'all' || !office) {
      const fiscalRes = await axios.get(`${mainUrl}/fiscalSummary`, {
        params: { //set query params from 1st el in yrs arr to 2nd el
          from: years[0],
          to: years[1],
        },
      });

      fiscalData = fiscalRes.data; //setting fis data to have the actual data we have fetched for it
      console.log('fiscal data for all offices:', fiscalData);
    } else { 
      //then fetch fis data for specific office
      const fiscalRes = await axios.get (`${mainUrl}/fiscalSummary`, {
        params: {
          from: years[0],
          to: years[1],
          office,
        },
      });

      fiscalData = fiscalRes.data;
      console.log(`fiscal data for ${office} :`, fiscalData);

      //fetch cit data for specific off
      const citizenshipRes = await axios.get(`${mainUrl}/citizenshipSummary`, {
        params: {
          from: years[0],
          to: years[1],
          office,
        },
      });
      //filling our previously created var with the cit data we just fetched
      citizenshipData = citizenshipRes.data;
      console.log(`citizenship data from ${office}:`, citizenshipData);
    }

    //combine data into single obj
    const allData = { ...fiscalData, citizenshipResults: citizenshipData};
    console.log('new data obj:', allData);

    //invoke the callback to set state with fetched data
    stateSettingCallback(view, office, [allData]);
  } catch (err) {
    console.error('error fetching data:', err);
  }                              
   // check if office is set to all or null
    // if (office === 'all' || !office) {
    //    axios.get(
    //     `${mainUrl}/fiscalSummary`, {
          
    //       params: {
    //         from: years[0],
    //         to: years[1],
    //       },
    //     })
    //     .then(result => {
    //       stateSettingCallback(view, office, [result.data]); // <-- `test_data` here can be simply replaced by `result.data` in prod!
    //     })
    //     .catch(err => {
    //       console.error(err);
    //     });
    // } else {
    //   axios
    //     .get(`${mainUrl}/citizenshipSummary`, {
    //       // mock URL, can be simply replaced by `${Real_Production_URL}/summary` in prod!
    //       params: {
    //         from: years[0],
    //         to: years[1],
    //         office: office,
    //       },
    //     })
    //     .then(result => {
    //       stateSettingCallback(view, office, [result.data]); // <-- `test_data` here can be simply replaced by `result.data` in prod!
    //     })
    //     .catch(err => {
    //       console.error(err);
    //     });
    // }
  }
  const clearQuery = (view, office) => {
    dispatch(resetVisualizationQuery(view, office));
  };
  return (
    <div
      className="map-wrapper-container"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        minHeight: '50px',
        backgroundColor: background_color,
      }}
    >
      <ScrollToTopOnMount />
      {map_to_render}
      <div
        className="user-input-sidebar-container"
        style={{
          width: '300px',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <ViewSelect set_view={set_view} />
        <YearLimitsSelect
          view={view}
          office={office}
          clearQuery={clearQuery}
          updateStateWithNewData={updateStateWithNewData}
        />
      </div>
    </div>
  );
}

export default connect()(GraphWrapper);
