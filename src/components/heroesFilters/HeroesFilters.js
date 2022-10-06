import {useHttp} from '../../hooks/http.hook';
import { useDispatch, useSelector} from 'react-redux';
import store from '../../store';
import { useEffect } from 'react';
import { activeFilterChanged, selectAll, fetchFilters } from './filtersSlice';
import Spinner from '../spinner/Spinner';
import classNames from 'classnames';

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
 
    const {request} = useHttp();
    const dispatch = useDispatch();
    const {filtersLoadingStatus, activeFilter} = useSelector(state => state.filters);
    const filters = selectAll(store.getState());

    useEffect(() => {
        dispatch(fetchFilters(request));

        // eslint-disable-next-line
    }, []);

    const renderFilters = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Фильтры отсутствуют</h5>
        }

        return arr.map(({name, className, label}) => {
            const btnClass = classNames('btn', className, {
                'active': name === activeFilter
            });
            return <button 
            key={name} 
            className={btnClass}
            onClick={() => dispatch(activeFilterChanged(name))}>{label}</button>
        })
    }

    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    } 

    const filtersList = renderFilters(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                        {filtersList}
                    {/* <button className="btn btn-outline-dark active">Все</button>
                    <button className="btn btn-danger">Огонь</button>
                    <button className="btn btn-primary">Вода</button>
                    <button className="btn btn-success">Ветер</button>
                    <button className="btn btn-secondary">Земля</button> */}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;