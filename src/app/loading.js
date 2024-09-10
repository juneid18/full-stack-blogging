import style from './page.module.css'

const loading = () => {
  return (
    <div className={style.loading_container}>
    <div className={style.loader}></div>
    </div>
  )
}

export default loading