import React, {useState} from 'react';
import DownArrow from '../image/down-arrow.svg';
import {useLocation, useNavigate, useSearchParams} from '@remix-run/react';

function Filter({filters, appliedFilters = []}) {
  const [filterOpen, setFilterOpen] = useState({});
  const [index, setIndex] = useState(null);
  const [params] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleFilterDrawer = (id) => {
    setIndex(id);
    setFilterOpen((prevFilters) => ({
      ...prevFilters,
      [id]: !prevFilters[id],
    }));
  };

  const toggleAppliedFilter = (filter) => {
    const isFilterApplied = appliedFilters.some(
      (obj) => obj.label === filter.label,
    );
    
    if (isFilterApplied) {
      // Filter is applied, remove it
      const newFilters = appliedFilters.filter(
        (obj) => obj.label !== filter.label,
      );
      navigate(`${location.pathname}?${newFilters.map((f) => f.to).join('&')}`);
    } else {
      // Filter is not applied, add it
      navigate(
        `${location.pathname}?${[...appliedFilters, filter]
          .map((f) => f.to)
          .join('&')}`,
      );
    }
  };

  return (
    <div className="left_filter">
      <h3>Filter</h3>
      <ul>
        {filters.map((item) => (
          <li
            key={item.id}
            className={`flex justify_between filter_show ${
              filterOpen[item.id] ? 'active' : ''
            }`}
          >
            {item.label}
            <button
              className="filter_down_arrow"
              onClick={() => toggleFilterDrawer(item.id)}
            >
              <img src={DownArrow} alt="" />
            </button>
            <div className="filter_product_option">
              {item.values?.map((items) => {
                const to = getFilterLink(item, items.input, params, location);
                return (
                  <React.Fragment key={items.id}>
                    <div className="filter_product_type flex">
                      <input
                        type="checkbox"
                        name={items.label}
                        id={items.id}
                        onChange={() => {
                          navigate(to);
                        }}
                        checked={
                          appliedFilters?.some(
                            (obj) => obj.label === items.label,
                          )
                            ? true
                            : false
                        }
                      />
                      <div className="left_product_type">
                        <label
                          className={`pro_type_button ${
                            toggleAppliedFilter ? 'active' : ''
                          }`}
                          onClick={() =>
                            toggleAppliedFilter({label: items.label, to})
                          }
                          htmlFor={items.id}
                        >
                          {items.label}
                        </label>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Filter;

function getAppliedFilterLink(filter, params, location) {
  const paramsClone = new URLSearchParams(params);
  if (filter.urlParam.key === 'variantOption') {
    const variantOptions = paramsClone.getAll('variantOption');
    const filteredVariantOptions = variantOptions.filter(
      (options) => !options.includes(filter.urlParam.value),
    );
    paramsClone.delete(filter.urlParam.key);
    for (const filteredVariantOption of filteredVariantOptions) {
      paramsClone.append(filter.urlParam.key, filteredVariantOption);
    }
  } else {
    paramsClone.delete(filter.urlParam.key);
  }
  return `${location.pathname}?${paramsClone.toString()}`;
}

function getFilterLink(filter, rawInput, params, location) {
  const paramsClone = new URLSearchParams(params);
  const newParams = filterInputToParams(filter.type, rawInput, paramsClone);
  return `${location.pathname}?${newParams.toString()}`;
}

function filterInputToParams(type, rawInput, params) {
  const input = typeof rawInput === 'string' ? JSON.parse(rawInput) : rawInput;
  switch (type) {
    case 'PRICE_RANGE':
      if (input.price.min) params.set('minPrice', input.price.min);
      if (input.price.max) params.set('maxPrice', input.price.max);
      break;
    case 'LIST':
      Object.entries(input).forEach(([key, value]) => {
        if (typeof value === 'string') {
          params.set(key, value);
        } else if (typeof value === 'boolean') {
          params.set(key, value.toString());
        } else {
          const {name, value: val} = value;
          const allVariants = params.getAll(`variantOption`);
          const newVariant = `${name}:${val}`;

          if (!allVariants.includes(newVariant)) {
            params.append('variantOption', newVariant);
          }
        }
      });
      break;
  }

  return params;
}
