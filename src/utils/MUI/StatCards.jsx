import {
  Box,
  Card,
  Grid,
  Icon,
  IconButton,
  styled,
  Tooltip,
} from '@mui/material'
import { Small } from './Typography'
import { UserContext } from './../../hooks/UserContext'
import React, { FC, useContext, useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import FeaturedVideoIcon from '@mui/icons-material/FeaturedVideo';
import DiamondIcon from '@mui/icons-material/Diamond';
const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '24px !important',
  background: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: { padding: '16px !important' },
}))

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  '& small': { color: theme.palette.text.secondary },
  '& .icon': {
    opacity: 0.6,
    fontSize: '44px',
    color: theme.palette.primary.main,
  },
}))

const Heading = styled('h6')(({ theme }) => ({
  margin: 0,
  marginTop: '4px',
  fontSize: '14px',
  fontWeight: '500',
  color: theme.palette.primary.main,
}))

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric"}
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const StatCards = () => {
  const { user, setUser } = useContext(UserContext)
  const urlbackend = process.env.REACT_APP_BACKEND_API_URL
  const endpointGetAcompanhantes = '/acompanhantes-de-luxo/byanunciante'
  const endpointuser = '/utilizador'
  const endpointAcompanhante = '/acompanhantes-de-luxo'
  const [anuncio, setAnuncio] = useState()

  const [visualiazoesAd, setvisualiazoesAd] = useState()
  const [cliquesWhatsapp, setcliquesWhatsapp] = useState()
  const [dataInicioAnuncio, setdataInicioAnuncio] = useState()
  const [anuncioPublicadoAte, setanuncioPublicadoAte] = useState()
  const [destaquepp, setdestaquepp] = useState()
  const [destaqueaparecerprimeiro, setDestaqueAparecerPrimeiro] = useState()

  useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    if (user) {
      //TODO anular endpoint , se tiver concelho nao puxar distrito, se tiver distrito e sem concelho, usar este endpoint, se nao tiver nada usar sem endpoint
      axios
        .get(urlbackend + endpointGetAcompanhantes + '/' + user?._id)
        .then((response) => {
          console.log('Response got ad: ' + JSON.stringify(response.data))
          setAnuncio(response.data)
          console.log('UseEffect ok.')
        })
    }
  }, [user])

  useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    setvisualiazoesAd(anuncio?.visualizacoes);
    setcliquesWhatsapp(anuncio?.cliqueswhatsapp);
    setdataInicioAnuncio(formatDate(anuncio?.datainicioanuncio));
    setanuncioPublicadoAte(formatDate(anuncio?.datafimanuncio));

    if(anuncio?.destaquepaginaprincipal){
      setdestaquepp("Ativo.")
    }else{
      setdestaquepp("Não Ativo.")
    }

    if(anuncio?.destaquenalocalizacao){
      setDestaqueAparecerPrimeiro("Ativo.")
    }else{
      setDestaqueAparecerPrimeiro("Não Ativo.")
    }
  }, [anuncio])

  return (
    <Grid container spacing={3} sx={{ mb: '24px' }}>
        <Grid item xs={12} md={6} >
          <StyledCard elevation={6}>
            <ContentBox>
              <PeopleOutlineIcon className="icon"/>
              <Box ml="12px">
                <Small>Visualizações Anúncio</Small>
                <Heading>{visualiazoesAd && visualiazoesAd}</Heading>
              </Box>
            </ContentBox>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={6} >
          <StyledCard elevation={6}>
            <ContentBox>
              <WhatsAppIcon className="icon"/>
              <Box ml="12px">
                <Small>Cliques Whatsapp</Small>
                <Heading>{cliquesWhatsapp && cliquesWhatsapp}</Heading>
              </Box>
            </ContentBox>
          </StyledCard>
        </Grid>
            
        <Grid item xs={12} md={6} >
          <StyledCard elevation={6}>
            <ContentBox>
              <EventAvailableIcon className="icon"/>
              <Box ml="12px">
                <Small>Data Inicio Anúncio</Small>
                <Heading>{dataInicioAnuncio && dataInicioAnuncio}</Heading>
              </Box>
            </ContentBox>
          </StyledCard>
        </Grid>
            
        <Grid item xs={12} md={6} >
          <StyledCard elevation={6}>
            <ContentBox>
              <EventBusyIcon className="icon"/>
              <Box ml="12px">
                <Small>O seu Anúncio acaba em: </Small>
                <Heading>{anuncioPublicadoAte && anuncioPublicadoAte}</Heading>
              </Box>
            </ContentBox>
          </StyledCard>
        </Grid>
            
        <Grid item xs={12} md={6} >
          <StyledCard elevation={6}>
            <ContentBox>
              <DiamondIcon className="icon"/>
              <Box ml="12px">
                <Small>Destaque Página principal</Small>
                <Heading>{destaquepp && destaquepp}</Heading>
              </Box>
            </ContentBox>
          </StyledCard>
        </Grid>
            
        <Grid item xs={12} md={6} >
          <StyledCard elevation={6}>
            <ContentBox>
              <FeaturedVideoIcon className="icon"/>
              <Box ml="12px">
                <Small>Destaque "Aparecer primeiro"</Small>
                <Heading>{destaqueaparecerprimeiro && destaqueaparecerprimeiro}</Heading>
              </Box>
            </ContentBox>
          </StyledCard>
        </Grid>
            
    </Grid>
  )
}

export default StatCards
