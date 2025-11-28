import React from 'react';
import './FiltersBar.modules.scss'

const FilterBtn: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <button className="filter-btn" type="button">{children}</button>
);

const FiltersBar: React.FC = () => {
  return (
    <div className="filters-row">
      <div className="filters-left">
        <FilterBtn>Выберите дату ▾</FilterBtn>
        <FilterBtn>Все офферы ▾</FilterBtn>
        <FilterBtn>USD ▾</FilterBtn>
        <FilterBtn>Все площадки ▾</FilterBtn>
      </div>
      <div className="filters-right">
        <FilterBtn>Экспорт ▾</FilterBtn>
      </div>
    </div>
  );
};

export default FiltersBar;
