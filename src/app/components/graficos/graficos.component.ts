import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Chart, registerables } from 'chart.js';
import { Event } from '../../interfaces/event';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-graficos',
  standalone: true,
  imports: [],
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.scss']
})
export class GraficosComponent implements OnInit {
  listEvents: Event[] = [];
  barChart: any;
  lineChart: any;

  constructor(private eventService: EventService) {
    Chart.register(...registerables);
    Chart.register(ChartDataLabels);
  }

  ngOnInit(): void {
    this.eventService.getListEvents().subscribe(data => {
      console.log(data);
      this.listEvents = data;
      this.createCharts();
      window.addEventListener('resize', this.updateCharts.bind(this));
    });
  }

  updateCharts(): void {
    if (this.barChart) this.barChart.destroy();
    if (this.lineChart) this.lineChart.destroy();
    this.createCharts();
  }

  createCharts(): void {
    const titles = this.listEvents.map((event, index) => (index + 1).toString());
    const fullTitles = this.listEvents.map(event => event.titulo);
    const costs = this.listEvents.map(event => parseFloat(event.costo.toString()));

    this.generateLegend('barChartLegend', fullTitles, costs);
    this.generateLegend('lineChartLegend', fullTitles, costs);

    this.barChart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: titles,
        datasets: [{
          label: 'Costos',
          data: costs,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            ticks: {
              font: {
                size: window.innerWidth >= 920 ? 10 : 12,
              },
              display: true,
            }
          },
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          datalabels: {
            display: (context) => window.innerWidth >= 920,
            color: '#000',
            formatter: (value: number) => `€${value.toFixed(2)}`,
            font: {
              weight: 'bold',
              size: 14,
            },
          },
        }
      }
    });

    this.lineChart = new Chart('lineChart', {
      type: 'line',
      data: {
        labels: titles,
        datasets: [{
          label: 'Costos',
          data: costs,
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            ticks: {
              font: {
                size: window.innerWidth >= 920 ? 10 : 12,
              },
              display: true,
            }
          },
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          datalabels: {
            display: (context) => window.innerWidth >= 920,
            color: '#000',
            formatter: (value: number) => `€${value.toFixed(2)}`,
            font: {
              weight: 'bold',
              size: 14,
            },
          },
        }
      }
    });

    new Chart('donutChart', {
      type: 'doughnut',
      data: {
        labels: fullTitles,
        datasets: [{
          label: 'Costos',
          data: costs,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          datalabels: {
            display: (context) => window.innerWidth >= 920,
            color: '#000',
            formatter: (value: number) => `€${value.toFixed(2)}`,
            font: {
              weight: 'bold',
              size: 14,
            },
          },
        }
      }
    });
  }

  generateLegend(legendId: string, labels: string[], costs: number[]): void {
    const legendElement = document.getElementById(legendId);
    if (legendElement) {
      legendElement.innerHTML = labels.map((label, index) => {
        const cost = costs[index];
        const formattedCost = isNaN(cost) ? 'N/A' : `€${cost.toFixed(2)}`;
        return `<li>${index + 1}) ${label} - ${formattedCost}</li>`;
      }).join('');
      legendElement.style.display = 'block';
    }
  }
}
