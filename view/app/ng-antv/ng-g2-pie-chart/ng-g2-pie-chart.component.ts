import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import * as G2 from '@antv/g2';

@Component({
    selector: 'app-ng-g2-pie-chart',
    templateUrl: './ng-g2-pie-chart.component.html',
})
export class NgG2PieChartComponent implements OnInit, AfterViewInit {

    @ViewChild('dom') myDom: any;
    @Input() chartData;

    constructor() {
    }

    chartFn() {
        const data = this.chartData.list.map( item => {
            return {
                keyX: item[this.chartData.keyX],
                keyWord: item[this.chartData.keyWord],
                count: Number(item[this.chartData.count]),
                link: item.link
            };
        });
        const _fn = (val: any) => {
            return (val + '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
        };
        const fn = this.chartData.function || _fn;
        const width = this.chartData.width || 1000;
        const height = this.chartData.height || 500;

        const chart = new G2.Chart({
            container: this.myDom.nativeElement,
            autoFit: true,
            height: height,
            width: width
        });

        if (this.chartData.type === 'line') {
            chart.data(data);
            chart.scale({
                keyX: {
                    range: [0, 1],
                },
                count: {
                    min: 0,
                    nice: true,
                },
            });
            chart.scale('count', {
                type: 'linear',
                nice: true
            });

            chart.tooltip({
                showCrosshairs: true,
                shared: true,
            });
            chart.axis('count', {
                label: {
                    formatter: fn
                }
            });

            chart
                .line()
                .position('keyX*count')
                .color('keyWord');

            chart
                .point()
                .position('keyX*count')
                .color('keyWord')
                .shape('circle');
        }
        if (this.chartData.type === 'pie') {
            let totalNum = 0;
            data.forEach(element => {
                totalNum += (element.count || 0);
            });
            chart.data(data);
            chart.coordinate('theta', {
                radius: 0.75,
            });
            chart.scale('count', {
                type: 'linear',
                // nice: true,
                formatter: (val) => {
                    val = (val / totalNum * 100).toFixed(2) + '%';
                    return val;
                },
            });
            chart.tooltip({
                showTitle: false,
                showMarkers: false,
            });
            chart
                .interval()
                .adjust('stack')
                .position('count')
                .color('keyX')
                .label('count', {
                    offset: -40,
                    style: {
                        textAlign: 'center',
                        fontSize: 16,
                        shadowBlur: 2,
                        shadowColor: 'rgba(0, 0, 0, .45)',
                        fill: '#fff',
                    },
                })
                .tooltip('keyX*count', (item, percent) => {
                    percent = percent;
                    return {
                        name: item,
                        value: percent,
                    };
                });

            chart.interaction('element-active');
        }
        if (this.chartData.type === 'bar-X') {
            chart.data(data.reverse());
            chart.scale('count', { nice: true });
            chart.coordinate().transpose();
            chart.tooltip({
                showMarkers: false
            });
            chart.interaction('active-region');
            chart.interval().position( 'keyX*count');
        }
        if (this.chartData.type === 'bar') {
            chart.data(data);
            chart.scale('count', {
                type: 'linear',
                nice: true,
            });
            chart.tooltip({
                showMarkers: false,
                shared: true,
            });
            chart.axis('count', {
                label: {
                    formatter: fn
                },
            });
            chart
            .interval()
            .position('keyX*count')
            .color('keyWord')
            .adjust([
                {
                    type: 'dodge',
                    marginRatio: 0,
                },
            ]);
            chart.interaction('active-region');
            chart.render();
        }
        chart.render();
        chart.on('click', (ev) => {
            if (!ev.data || !ev.data.data) {
                return;
            }
            const itemData = ev.data.data;
            if (itemData.link) {
                // this.router.navigate([itemData.link]);
            }
        });
    }


    ngOnInit() {
        console.log(this.chartData);
    }

    ngAfterViewInit(): void {
        if (this.chartData) {
            this.chartFn();
        }
    }

}
