import emotion from 'react-emotion'

export const StyledPage = emotion('div')({
  maxWidth: '1000px',
  margin: 'auto',
  padding: '10px',
  paddingBottom: '200px',
})

export const StyledDayList = emotion('ul')({
  padding: '0',
  textAlign: 'center',
  '& > li': {
    display: 'inline-block',
    marginRight: '10px',
  },
})
