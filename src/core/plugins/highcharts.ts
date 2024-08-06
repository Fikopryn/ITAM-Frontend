import type { App } from "vue";
import HighchartsVue from "highcharts-vue";
import Highcharts from "highcharts";
import hcMore from "highcharts/highcharts-more";

/**
 * Initialize Highcharts component
 * @param app vue instance
 */
export function initHighcharts(app: App<Element>) {
  app.use(HighchartsVue as any);
  hcMore(Highcharts); //To load more charting components
}
