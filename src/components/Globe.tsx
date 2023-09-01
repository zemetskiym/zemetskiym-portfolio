// Import necessary functions and modules
import { useRef, useEffect } from "react";
import * as d3 from "d3";
import { D3DragEvent } from 'd3';

// Visualize GeoJSON on a globe using D3.js
export default function Globe (): JSX.Element {
    // Create a reference to the SVG element that will be rendered.
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {    
        // Select the SVG element.
        const svg = d3.select(svgRef.current);

        const fetchCountries = fetch("/data/globe/countryData.json").then(response => response.json());
        const fetchCities = fetch("/data/globe/cityData.json").then(response => response.json());

        Promise.all([fetchCountries, fetchCities])
          .then((data) => {
            let countryData = data[0];
            const cityData = data[1];

            // Combine countryData and cityData for easier rotation.
            countryData.features = countryData.features.concat(cityData.features);

            // Set the height, width, and sensitivity of the SVG globe. 
            const height = 220;
            const width = 220;
            const sensitivity = 75;
    
            // Define the projection for the globe.
            let projection = d3.geoOrthographic()
                .scale(width / 2 - 1)
                .translate([width / 2, height / 2]);
            
            let path: any = d3.geoPath().projection(projection).pointRadius(0.5);

            // Append a circle representing the globe to the SVG.
            svg.append("circle")
                .attr("fill", "#121212")
                .attr("stroke", "#2E2E2E")
                .attr("stroke-width", 0.2)
                .attr("cx", width / 2)
                .attr("cy", height / 2)
                .attr("r", projection.scale());

            let map = svg.append("g")
            
            // Append the country paths and city points to the map.
            map.append("g")
                .selectAll("path")
                .data(countryData.features)
                .enter().append("path")
                .attr("d", path)
                .attr("z-index", (d: any) => d.geometry.type == "Point" ? 3 : 1)
                .style("fill", (d: any) => d.geometry.type == "Point" ? "#FFFFFF" : "#1E1E1E")
                .style("stroke", (d: any) => d.geometry.type == "Point" ? "None" : "2E2E2E")
                .style("stroke-width", 0.3);
            
            // Generate the latitude and longitude lines using d3.geoGraticule().
            const graticuleGenerator = d3.geoGraticule();

            // Append the graticule path to the map.
            map.append("path")
                .datum(graticuleGenerator)
                .attr("d", path)
                .style("fill", "none")
                .style("stroke", "#444444")
                .style("stroke-width", 0.4);

            // Update the rotation of the globe on user drag.
            // @ts-ignore
            svg.call(d3.drag().on('drag', (event: D3DragEvent<SVGSVGElement, any, any>) => {
                const rotate = projection.rotate();
                const k = sensitivity / projection.scale();
                projection.rotate([
                    rotate[0] + event.dx * k,
                    rotate[1] - event.dy * k
                ]);
                path = d3.geoPath().projection(projection);
                svg.selectAll("path").attr("d", path);
            }));

            // Update the rotation of the globe and paths every 200 milliseconds.
            d3.timer(function() {
                const rotate = projection.rotate()
                const k = sensitivity / projection.scale()
                projection.rotate([
                    rotate[0] - 1 * k,
                    rotate[1]
                ])
                path = d3.geoPath().projection(projection).pointRadius(0.5);
                svg.selectAll("path").attr("d", path)    
            }, 200);
          });
    }, []);

    return <svg ref={svgRef} height={220} width={220} />
}
