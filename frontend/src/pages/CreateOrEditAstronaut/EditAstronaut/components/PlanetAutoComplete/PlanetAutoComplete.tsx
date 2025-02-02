import { ChangeEvent, forwardRef, InputHTMLAttributes, useEffect, useMemo, useState } from 'react';
import classnames from 'classnames';
import { HUDListItem } from '@components/HUDListItem';
import styles from './PlanetAutoComplete.module.css';

interface PlanetAutoCompleteProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'defaultValue'> {
  error?: string;
  autoCompleteOptions: (searchTerm?: string) => AutoCompleteOptionType[];
  fieldLabel: string;
  onChange?: (selectedOption: AutoCompleteOptionType) => void;
  defaultValue: AutoCompleteOptionType;
}

export type AutoCompleteOptionType = {
  label: string;
  value: string;
};

type AutoCompleteOptionsStateType = {
  data: AutoCompleteOptionType[];
  isVisible: boolean;
};

export const PlanetAutoComplete = forwardRef<HTMLInputElement | null, PlanetAutoCompleteProps>(
  function HUDInputComponent(
    {
      className,
      defaultValue,
      error = null,
      autoCompleteOptions,
      fieldLabel,
      name,
      onChange,
      placeholder,
      required = false,
      style,
      type = 'text',
    },
    ref,
  ) {
    const componentClassNames = classnames(styles.hudautocomplete, className);
    const inputClassNames = classnames(styles.hudautocompleteHtmlInput, {
      [styles.hudautocompleteHtmlInputError]: error !== null,
    });
    const labelClassNames = classnames(styles.hudautocompleteLabel, {
      [styles.hudautocompleteLabelError]: error !== null,
    });
    const barClassNames = classnames(styles.hudautocompleteBar, {
      [styles.hudautocompleteBarError]: error !== null,
    });
    const optionsClassNames = classnames(styles.hudautocompleteOptions, {
      [styles.hudautocompleteOptionsError]: error !== null,
    });

    const [options, setOptions] = useState<AutoCompleteOptionsStateType>({
      data: [],
      isVisible: false,
    });
    const [selectedOption, setSelectedOption] = useState<AutoCompleteOptionType | null>();

    const data = useMemo(() => autoCompleteOptions(), [autoCompleteOptions]);

    useEffect(() => {
      setOptions({
        data,
        isVisible: false,
      });
    }, [data]);

    const handleOptionOnClick = (newOptionValue: AutoCompleteOptionType) => {
      setSelectedOption(newOptionValue);
      if (onChange) {
        onChange(newOptionValue);
      }
    };

    const handleInputOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
      const searchTerm = e.target.value;
      const searchedList = autoCompleteOptions(searchTerm);
      setOptions({
        data: searchedList,
        isVisible: true,
      });
    };

    const handleVisibleOnFocus = () => {
      setOptions({ ...options, isVisible: true });
    };

    const handleNotVisibleOnBlur = async () => {
      setTimeout(() => {
        setOptions({ ...options, isVisible: false });
      }, 100);
    };

    return (
      <div className={componentClassNames} style={style}>
        <input
          name={`${name}_value`}
          id={`${name}_value`}
          defaultValue={defaultValue.value}
          value={selectedOption?.value}
          ref={ref}
          type="hidden"
        />
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          className={inputClassNames}
          placeholder={placeholder}
          value={selectedOption?.label}
          defaultValue={defaultValue.label}
          onChange={handleInputOnChange}
          onFocus={handleVisibleOnFocus}
          onBlur={handleNotVisibleOnBlur}
        />

        <label htmlFor={name} className={labelClassNames}>
          {fieldLabel}
        </label>
        <i className={barClassNames}></i>
        {error && <div className={styles.hudautocompleteError}>{error}</div>}
        {options.isVisible && (
          <div className={optionsClassNames}>
            {options.data?.map(({ label, value }: AutoCompleteOptionType) => (
              <HUDListItem key={`${value}`} hasBorder onClick={() => handleOptionOnClick({ label, value })}>
                {label}
              </HUDListItem>
            ))}
          </div>
        )}
      </div>
    );
  },
);
