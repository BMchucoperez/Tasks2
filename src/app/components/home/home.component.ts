import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { TaskService } from '../../services/task.service';
import { ITypePercentage } from '../../interface/task.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  public doughnutChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  public doughnutChartData: ChartDataset[] = [];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartColor: string[] = ['#f68059', '#ffbf3a', '#4e3dc8'];


  public typeData: Array<ITypePercentage> = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getTypePercentage();
  }

  getTypePercentage() {
    this.doughnutChartData = [];
    this.taskService.getTypePercentage().subscribe(
      (d) => {
        this.typeData = d;
        const data: number[] = [];
        d.forEach((type: ITypePercentage) => {
          data.push(type.count);
        });
        this.doughnutChartData.push({ data, backgroundColor: ['#f68059', '#ffbf3a', '#4e3dc8'] });
      },
      (error) => {
        console.error(error);
      }
    );
  }
  refreshEmitter() {
    // Lógica para manejar el evento aquí
    console.log('Refresh emittido desde el componente hijo.');
  }
}
