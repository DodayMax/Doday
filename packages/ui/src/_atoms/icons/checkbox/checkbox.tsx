import * as React from 'react';
import { IconProps } from '../names';

interface CheckboxProps extends IconProps {
  checked?: boolean;
}

export const Checkbox = ({
  width = 20,
  height = 20,
  color = '#000',
  checked = false,
}: CheckboxProps) => {
  if (!checked) {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="none" fillRule="evenodd">
          <g
            strokeWidth=".534"
            transform="translate(1.122 1.66)"
            stroke={color}
          >
            <rect
              fill="#FFF"
              x=".267"
              y=".267"
              width="20.828"
              height="20.828"
              rx="3.204"
            />
            <rect
              fill={color}
              x="2.136"
              y="2.136"
              width="17.09"
              height="17.09"
              rx="1.602"
            />
          </g>
        </g>
      </svg>
    );
  } else {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="none" fillRule="evenodd">
          <g strokeWidth=".5" transform="translate(1.122 1.66)" stroke={'#000'}>
            <rect
              fill="#FFF"
              x=".267"
              y=".267"
              width="20.828"
              height="20.828"
              rx="3.204"
            />
            <rect
              fill={color}
              x="2.136"
              y="2.136"
              width="17.09"
              height="17.09"
              rx="1.602"
            />
          </g>
          <path
            d="M14.238 22.508a.46.46 0 0 1-.066.09.474.474 0 0 1-.609.112L.453 14.956a.5.5 0 0 1-.175-.67l4.314-7.657a.474.474 0 0 1 .654-.18l4.632 2.74L14.79.475a.474.474 0 0 1 .654-.18l8.067 4.771a.5.5 0 0 1 .176.67l-9.45 16.772z"
            stroke={'#000'}
            strokeWidth=".4"
            fill="#FFF"
          />
          <path
            d="M23.096 5.816l-9.034 16.272a.346.346 0 0 1-.21.168.338.338 0 0 1-.263-.036l-7.503-4.508a.369.369 0 0 1-.126-.493L14.993.95a.346.346 0 0 1 .21-.168.338.338 0 0 1 .263.035l7.503 4.506c.166.101.222.32.127.492z"
            fill={'#000'}
          />
          <path
            d="M5.365 7.079l12.427 7.323c.08.047.137.124.161.214a.361.361 0 0 1-.034.269l-3.997 7.066a.343.343 0 0 1-.473.129L1.021 14.757a.361.361 0 0 1-.127-.483L4.89 7.208a.343.343 0 0 1 .474-.13z"
            fill={'#000'}
          />
          <path
            d="M10.747 10.296a.297.297 0 0 1-.102-.405l4.533-7.87a.304.304 0 0 1 .402-.115l6.593 3.78c.14.08.184.264.103.406l-4.533 7.869a.304.304 0 0 1-.403.115l-6.593-3.78z"
            fill="#F5CE24"
          />
          <path
            d="M8.767 14.148c-.788 1.398-2.572 1.863-3.97 1.036l-1.869-1.109-.062-.037 2.86-5.076.016.01 1.916 1.132c1.398.828 1.9 2.635 1.109 4.044zm-1.173-.694a1.62 1.62 0 0 0 .151-1.212 1.646 1.646 0 0 0-.752-.976l-.703-.416-1.545 2.738.71.421c.36.217.789.28 1.194.175.4-.102.74-.367.945-.733v.003zM14.84 17.831c-.815 1.445-2.648 1.923-4.094 1.067-1.445-.856-1.958-2.72-1.144-4.168.814-1.448 2.647-1.923 4.093-1.067 1.446.856 1.958 2.724 1.144 4.168zm-1.095-.647c.23-.406.288-.89.162-1.341-.268-.95-1.22-1.514-2.158-1.277a1.696 1.696 0 0 0-1.054.814 1.77 1.77 0 0 0-.163 1.342c.268.95 1.22 1.513 2.157 1.276a1.687 1.687 0 0 0 1.056-.814z"
            fill="#FAFAFA"
          />
          <path
            d="M15.849 9.207c.121.07.234.157.334.257a1.602 1.602 0 0 1 .403.666 1.409 1.409 0 0 1-.12 1.107l-.454.806a.11.11 0 0 1-.044.045.077.077 0 0 1-.07-.013l-2.49-1.473a.111.111 0 0 1-.049-.054.08.08 0 0 1 .009-.073l.455-.807a1.334 1.334 0 0 1 .532-.522 1.43 1.43 0 0 1 .725-.17c.27.011.535.09.769.23zm-1.532 1.09l1.37.811.078-.138.039-.072.034-.073a.713.713 0 0 0 .064-.268.76.76 0 0 0-.176-.517.868.868 0 0 0-.235-.199.839.839 0 0 0-.304-.111.775.775 0 0 0-.296.011.712.712 0 0 0-.453.346l-.12.21zM15.002 7.295a.1.1 0 0 1 .006-.104.092.092 0 0 1 .063-.046.297.297 0 0 1 .085-.006c.025.002.05.005.074.01a.052.052 0 0 0 .036 0l3.123.476a.07.07 0 0 0 .018.007.06.06 0 0 1 .046.05.061.061 0 0 1-.017.052l-.29.527a.1.1 0 0 1-.12.052l-.273-.062-.478.848.19.211c.036.034.043.09.017.132l-.296.524a.06.06 0 0 1-.034.04.058.058 0 0 1-.066-.015.071.071 0 0 0-.015-.013L15.104 7.44a.747.747 0 0 1-.053-.073 3.095 3.095 0 0 0-.049-.072zm1.84 1.323l.29-.51-.944-.218.655.728zM17.482 5.82l-.84-1.026a.292.292 0 0 1-.023-.035.06.06 0 0 1-.007-.021.036.036 0 0 1 0-.016.132.132 0 0 0 .006-.02l.355-.631a.022.022 0 0 1 .014-.014.022.022 0 0 1 .02.003.072.072 0 0 1 .019.02l.02.03 1.2 1.745.852.505a.082.082 0 0 1 .05.052.085.085 0 0 1-.009.073l-.277.491a.071.071 0 0 1-.051.038.11.11 0 0 1-.07-.018l-.858-.51-2.063-.188h-.033a.056.056 0 0 1-.022-.007.042.042 0 0 1-.016-.016.02.02 0 0 1 0-.021l.355-.63a.125.125 0 0 0 .015-.016.035.035 0 0 1 .013-.01.058.058 0 0 1 .022-.004h.04l1.288.226z"
            fill={'#000'}
          />
        </g>
      </svg>
    );
  }
};
