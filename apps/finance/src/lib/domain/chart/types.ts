import type {
  ChartData,
  Chart as ChartJS,
  ChartOptions,
  ChartType,
  DefaultDataPoint,
  Plugin,
  UpdateMode
} from 'chart.js';

export interface ChartBaseProps<
  TType extends ChartType = ChartType,
  TData = DefaultDataPoint<TType>,
  TLabel = unknown
> {
  /**
   * The data object that is passed into the Chart.js chart
   * @see https://www.chartjs.org/docs/latest/getting-started/
   */
  data: ChartData<TType, TData, TLabel>;
  /**
   * Key name to identificate dataset
   * @default 'label'
   */
  datasetIdKey?: string;
  /**
   * The options object that is passed into the Chart.js chart
   * @see https://www.chartjs.org/docs/latest/general/options.html
   * @default {}
   */
  options?: ChartOptions<TType>;
  /**
   * The plugins array that is passed into the Chart.js chart
   * @see https://www.chartjs.org/docs/latest/developers/plugins.html
   * @default []
   */
  plugins?: Plugin<TType>[];
  /**
   * Chart.js chart type
   */
  type: TType;
  /**
   * A mode string to indicate transition configuration should be used.
   * @see https://www.chartjs.org/docs/latest/developers/api.html#update-mode
   */
  updateMode?: UpdateMode;
}

export interface ChartComponentRef<
  TType extends ChartType = ChartType,
  TData = DefaultDataPoint<TType>,
  TLabel = unknown
> {
  chart: ChartJS<TType, TData, TLabel> | null;
}
