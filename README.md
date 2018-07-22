<div align="center">
  <img width="200" height="200"
    src="https://sandstorm.de/_Resources/Persistent/3285416e8503b2c8354c321bcd690cf550b8b2d3/React-Logo.svg">
  <a href="https://www.mobiquityinc.com/">
    <img width="200" height="200"
      src="https://p13.zdassets.com/hc/settings_assets/279635/200092723/YpHS0eJvaqMDkOwlh6RGjg-NMPTST.png">
  </a>
  <h1>React Mobiquity</h1>
</div>

This is an small excercise in React which consists in an application fetching data from https://ergast.com/mrd/ to show custom results. To check it out, download the master branch and then:

    $ yarn

    $ yarn dev

For production:

    $ yarn run build

## Implementation

This project is based in __React + Webpackt4__. For more information about how the webpack configuration is done, please visit [webpack4 respository][1] from this GitHub account. In general lines, the bundler compiles JavaScript based on Babel, CSS with PostCSS/nano and there are configurations for development and production. Eslint is configured following the [AirBnb][2] standard, defining in VSCode the Prettier custom style as well.

## Desing Pattern
For this project was only needed a _stateful component_ which is working as _container_ for the application; the rest are _stateless components_. In any case, each component in JavaScript has a corresponding SCSS file, thus this application doesn't work with CSS modules.

## SASS / CSS
SCSS files are based on the __BEM__ system and classes in HTML are called regarding the _B.E.M._ rules. For the responsiveness, sizes are relative and based on __rem__ units. To avoid problems with browsers interpretations about the behaviour of measurements, on the _base.scss_ files is places a general ajustment for the _html tag_. For more information about how to do that, please visit the next personal [repository][3].

## React
To call the server is used __Axios__ as library to use promises for catching data. This way is more complete than the simple __fetch()__ methode from native JavaScript. For more information about this, please visit the next personal [repository][4] with an explanation which is showing the differences between both methods.

The application starts calling to two differents end points. To avoid sincronisation problems between both due to the asynchronous behavior, the calls are spreaded in an array, using one of the best benefits of Axios.

Esencially there is a loop which shows the results depending of the _year_ parameter, and at the same time it matchs a property of other loop to make one element different than the others. This one is the final result / aim of this exercise.

Modal with animation and backdrop is done with pure CSS, and tooltip is a component based on the library [react-tippy][5].

## MobX

There is a second branch called _MobX_ which contains a another version with the __state management__ done by **MobX**.

[1]: https://github.com/silvestrevivo/webpack4-starter
[2]: https://github.com/airbnb/javascript
[3]: https://github.com/silvestrevivo/natours-css
[4]: https://github.com/silvestrevivo/axios-demo
[5]: https://github.com/tvkhoa/react-tippy
