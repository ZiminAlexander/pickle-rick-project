import React, { ReactNode, useEffect, useState } from 'react';
import { api } from './api';
import './App.css';
import { Grid, Pagination, Stack, Tab, Tabs } from '@mui/material';
import { useNavigate, Link, redirect, useRoutes } from "react-router-dom";

interface Character {
  id: string;
  name: string;
  status: string;
  image: string;
  location: {
    name: string;
  }
}

interface Location {
  id: string;
  name: string;
  type: string;
  dimension: string;
}

interface LinkTabProps {
  label: string;
  to: string;
}

interface PageWithPaginationProps {
  data: ReactNode;
  currentPage: number;
  setcurrentPage: Function;
  countOfPages: number;
}

function LinkTab(props: LinkTabProps) {
  return (
    <Tab
      component={Link}
      {...props}
    />
  );
}

const PageWithPagination = ({data, currentPage, setcurrentPage, countOfPages}: PageWithPaginationProps) => {
  return(
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      className='App'
    >
      <header>
        Rick and Morty characters
      </header>
      <Grid container
        spacing={0}
        className='App'
        justifyContent="center"
      >
        {data}
      </Grid>
      <Pagination size='large'
        count={countOfPages}
        page={currentPage}
        onChange={(event: React.ChangeEvent<unknown>, value: number) => {
          setcurrentPage(value);
        }} />
    </Stack>
  );
}

const CharacterPage = () => {
  const [charactersPerPage, setCharactersPerPage]: [Character[], Function] = useState([]);
  const [currentPage, setcurrentPage]: [number, Function] = useState(1);
  const [countOfPages, setCountOfPages]: [number, Function] = useState(42);

  useEffect(() => {
    api.getCharactersPerPage(currentPage)
      .then((response: {
        data: {
          results: Character[];
          info: {
            pages: number;
          }
        }
      }) => {
        setCharactersPerPage(response.data.results)
        setCountOfPages(response.data.info.pages)
      })
  }, [currentPage])

  const dataOfCharacters = charactersPerPage.map((character: Character) =>
    <div className='card' key={character.id}>
      <div className='name'>
        name: {character.name}
      </div>
      <div className='status'>
        status: {character.status}
      </div>
      <div className='photo'>
        <img src={character.image} className='person-image' alt='character'></img>
      </div>
      <div className='location'>
        location: {character.location.name}
      </div>
    </div>
  )

  return (
    <PageWithPagination 
    data={dataOfCharacters}
    currentPage={currentPage}
    setcurrentPage={setcurrentPage}
    countOfPages={countOfPages}
    />
  );
}

const LocationPage = () => {
  const [locationsPerPage, setLocationsPerPage]: [Location[], Function] = useState([]);
  const [currentPage, setcurrentPage]: [number, Function] = useState(1);
  const [countOfPages, setCountOfPages]: [number, Function] = useState(7);

  useEffect(() => {
    api.getLocationsPerPage(currentPage)
      .then((response: {
        data: {
          results: Location[];
          info: {
            pages: number;
          }
        }
      }) => {
        setLocationsPerPage(response.data.results)
        setCountOfPages(response.data.info.pages)
      })
  }, [currentPage])

  const dataOfLocations = locationsPerPage.map((location: Location) =>
    <div className='card' key={location.id}>
      <div className='name'>
        name: {location.name}
      </div>
      <div className='type'>
        type: {location.type}
      </div>
      <div className='demention'>
        dimension: {location.dimension}
      </div>
    </div>
  )

  return (
    <PageWithPagination 
    data={dataOfLocations}
    currentPage={currentPage}
    setcurrentPage={setcurrentPage}
    countOfPages={countOfPages}
    />
  );
}

const App = () => {

  const routers = useRoutes([
    {
      path: "/Characters",
      element: <CharacterPage />,
    },
    {
      path: "/Locations",
      element: <LocationPage />
    },
  ]);

  const [pageValue, setPageValue] = useState(0);
  const navigate = useNavigate();

  useEffect(() => { navigate("/characters"); }, []);

  return (
    <div className='app'>
      <Tabs
        value={pageValue}
        onChange={
          (event: React.SyntheticEvent, newValue: number) => {
            setPageValue(newValue);
            redirect("/pisya");
          }
        }
        variant="scrollable"
        scrollButtons={false}
        aria-label="scrollable prevent tabs example"
      >
        <LinkTab label="Characters" to="/characters" />
        <LinkTab label="Locations" to="/locations" />
      </Tabs>
      {routers}
    </div>
  );
}






export default App;
