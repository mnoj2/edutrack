import { Component, inject, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { HotToastService } from '@ngneat/hot-toast';
import { StudentService } from 'src/app/services/student.service';
import * as Highcharts from 'highcharts';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  username: string = '';
  totalStudents: number = 0;

  @ViewChild('donutChartContainer') donutChartContainer!: ElementRef;

  private authService = inject(AuthService);
  private toast = inject(HotToastService);
  private studentService = inject(StudentService);

  donutChart: any;

  ngOnInit() {
    this.authService.currentUser
      .pipe(takeUntil(this.destroy$))
      .subscribe(name => {
        this.username = name;
        if (this.authService.isFirstLogin) {
          setTimeout(() => {
            this.toast.success(`Hello, ${name}!`, { icon: '👋' });
            this.authService.setFirstLogin(false);
          }, 500);
        }
      });

    this.studentService.getStudentsCount()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (count) => {
          this.totalStudents = count;
        },
        error: (err) => {
          console.error('Error fetching count', err);
        }
      });

    this.studentService.getStudentsData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        setTimeout(() => {
          this.initDonutChart(data);
        }, 0);
      });
  }

  initDonutChart(students: any[]) {
    if (!this.donutChartContainer) return;

    const courseCounts = students.reduce((acc: { [key: string]: number }, student) => {
      const course = student.course || 'Unknown';
      acc[course] = (acc[course] || 0) + 1;
      return acc;
    }, {});

    const seriesData = Object.keys(courseCounts).map(courseName => ({
      name: courseName,
      y: courseCounts[courseName]
    }));


    const chartOptions: Highcharts.Options = {
      chart: {
        type: 'pie',
        backgroundColor: 'transparent',
      },
      title: {
        text: 'STUDENT DISTRIBUTION',
        margin: 50,
        style: { fontWeight: '900', color: '#0f120d', fontSize: '18px' }
      },
      credits: { enabled: false },
      plotOptions: {
        pie: {
          borderWidth: 3,
          borderColor: '#0f120d',
          colors: ['#c4f135', '#0f120d', '#666', '#eee'],
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.y} Students',
            style: {
              fontSize: '18px',
              color: '#0f120d',
              textOutline: 'none'
            }
          }
        }
      },
      series: [{
        type: 'pie',
        name: 'Students',
        colorByPoint: true,
        data: seriesData
      }] as any
    };

    this.donutChart = Highcharts.chart(
      this.donutChartContainer.nativeElement,
      chartOptions
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}