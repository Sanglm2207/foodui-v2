import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { OrderDetail } from '../../@core/_config/_models/OrderDetail';
import { fadeIn } from '../../shares/animations/fade-in';
import Color from "../../shares/utils/color.util";
import { DashboardService } from './dashboard.service';

interface Book {
  name: string;
  author: string;
}


@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [fadeIn]
})
export class DashboardComponent implements OnInit {


  analysisOrder = []; 

  constructor(private translate: TranslateService,
              private dashboardService: DashboardService) { 

  }

  ngOnInit(): void {
    this.getAnalysisOrderByMonth();
  }


  public getAnalysisOrderByMonth() {
    this.dashboardService.getAnalysisOrderByMonth().subscribe(data => {
      this.analysisOrder = data;
      console.log(this.analysisOrder);
      
    })
  }

  public barChart = {
    title: {
      text: "Doanh thu của nhà hàng theo tháng",
      subtext: "FKC Food",
      x: "center"
    },
    color: Color.baseColor,
    tooltip: {
      trigger: "axis",
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: "shadow"        // 默认为直线，可选为："line" | "shadow"
      },
      formatter: "Revenue in {b} reached {a}:{c}"
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: "value"
      }
    ],
    series: [
      {
        name: "",
        type: "bar",
        barWidth: "60%",
        itemStyle: {
          normal: {
            color: params => {
              const color = Color.genColor(this.barChart.series[0].data);
              return color[params.dataIndex];
            }
          }
        },
        data: [10, 52, 200, 334, 390, 330, 990]
      }
    ]
  };

  

}
