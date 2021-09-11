class PixelArt {
    constructor(el, rows, cols) {
        this.element = document.querySelector(el);
        this.colorPallete = null;
        this.rows = rows;
        this.cols = cols;
        this.clicked = false;
        this.color = null;
        this.colorElement = null;

        this.init();
        this.bindEvents();
    }

    init() {
        const grid = this.makeGrid();
        const colorPalette = this.makeColorPalette();
        this.colorPalette = colorPalette;
        this.element.appendChild(grid);
        this.element.appendChild(colorPalette);
    }

    // Make Grid
    makeGrid() {
        const grid = document.createDocumentFragment();
        for (let i = 0; i < this.rows; i++) {
            let container = document.createElement("div");
            container.classList.add("container");

            for (let j = 0; j < this.cols; j++) {
                let cell = document.createElement("span");
                cell.classList.add("cell");
                cell.setAttribute('data-cellposition', `${i}-${j}`);
                cell.setAttribute('data-colored', 0);
                container.appendChild(cell);
            }
            grid.appendChild(container);
        }
        return grid;
    }

    // Make color palette
    makeColorPalette() {
        // Random color generator
        function colorGenerator() {
            const letters = '0123456789ABCDEF';
            let color = "#";
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        let colorPalette = document.createElement("div");
        colorPalette.classList.add("container");

        for (let j = 0; j < this.cols; j++) {
            const color = colorGenerator();
            let cell = document.createElement("span");
            cell.style.background = color;
            cell.classList.add("cell");
            cell.style.cursor = "pointer";
            cell.setAttribute('data-color', color);
            colorPalette.appendChild(cell);
        }
        return colorPalette;
    }
    
    // Color cell
    colorCell(e) {
        const position = e.target.dataset.cellposition;
        e.target.dataset.colored = 1;
        const target = document.querySelector(`[data-cellposition='${position}']`);

        if (target)
            target.style.background = this.color;
    }

    // Event Listeners
    onMouseDown() {
        this.isClicked = true;
    }

    onMouseUp() {
        this.isClicked = false;
    }

    onMouseOver(e) {
        if (this.isClicked) {
            this.colorCell(e);
        }
    }

    onClick(e) {
        if (e.target.dataset.colored == 0) this.colorCell(e);
        else {
            e.target.dataset.colored = 0;
            e.target.style.background = "None";
        }
    }

    onSelectColor(e) {
        e.stopPropagation();
        const ele = e.target;
        const color = ele.dataset.color;
        ele.style.border = "2px solid red";

        if (this.colorElement) {
            this.colorElement.style.border = "1px solid black";
        }

        this.colorElement = ele;
        this.color = color;
    }

    bindEvents() {
        this.element.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.element.addEventListener('mouseup', this.onMouseUp.bind(this));
        this.element.addEventListener('mouseover', this.onMouseOver.bind(this));
        this.element.addEventListener('click', this.onClick.bind(this));
        this.colorPalette.addEventListener('click', this.onSelectColor.bind(this));
    }
}

new PixelArt("#grid", 15, 15);