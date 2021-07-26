import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { fadeIn } from '../../shares/animations/fade-in';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [fadeIn]
})
export class DashboardComponent implements OnInit {


  analysisOrder: any[];

  analysisPrice: any[];

  view: any[] = [700, 400];
  
  constructor(
    private translate: TranslateService,
    private dashboardService: DashboardService,
    private cdk: ChangeDetectorRef
  ) { }

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  legendTitle = 'Tháng';
  animations = true
  showXAxisLabel = true;
  xAxisLabel = 'Doanh số thu được của nhà hàng theo tháng';
  showYAxisLabel = true;
  yAxisLabel = 'Mức doanh thu (VND)';

  colorScheme = {
    domain: [
      '#EC407A',
      '#AB47BC',
      '#42A5F5',
      '#7E57C2',
      '#66BB6A',
      '#FFCA28',
      '#26A69A'
    ],
  };

  ngOnInit(): void {
    this.getAnalysisOrderByMonth();
    this.getTotalPriceByCustomerForMonth();
  }

  onSelect(event) {
    console.log(event);
  }

  public getAnalysisOrderByMonth() {
    this.dashboardService.getAnalysisOrderByMonth().subscribe(data => {
      this.analysisOrder = data;
      console.log(this.analysisOrder);

    })
  }

  public getTotalPriceByCustomerForMonth() {
    this.dashboardService.getTotalPriceByCustomer().subscribe(data => {
      this.analysisPrice = data;
      console.log(this.analysisPrice);

    })
  }

}
