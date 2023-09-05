class datatableHelper {
    constructor() {
        this.dom = '<"top"i>rt<"bottom"flp><"clear">';
        this.scrollCollapse = false;
        this.filter = true;
        this.scrollY = "100%";
        this.pageLength = 10;
    }

    setTableElement(tableElement) {
        this.table = tableElement;
    }

    setScrollCollapse(status) {
        this.scrollCollapse = status
    }

    setScrollY(size) {
        this.scrollY = size;
    }

    setFilter(status) {
        this.filter = status
    }

    setDom(status) {
        this.dom = status
    }

    setPageLength(pageLength) {
        this.pageLength = pageLength
    }

    initDataTable() {
        if (this.isExist(this.table.element)) {
            let tableElement = this.table.element;
            let filterElement = this.table.filterElement;
            let useFilter = this.filter;
            let pageLength = this.pageLength
            let table = tableElement.DataTable({
                order: [],
                dom: this.dom,
                processing: false,
                serverSide: false,
                responsive: true,
                scrollCollapse: this.scrollCollapse,
                scrollY: this.scrollY,
                pageLength: pageLength,
                initComplete: function () {
                    if (useFilter) {
                        filterElement.each(function (v, i) {
                            let title = $(this).text();
                            $(this).html('' + title + '<br><input id="footer-cell-' + i + '" type="text" placeholder="Search ' + title + '" />');
                        });
                        this.api()
                            .columns()
                            .every(function () {
                                let that = this;
                                $('input', this.header()).on('keyup clear', function () {
                                    if (that.search() !== this.value) {
                                        that.search(this.value).draw();
                                    }
                                });
                            });
                    }
                },
                ajax: {
                    url: this.getData(this.table.element, 'url'),
                    method: 'POST',
                },
                layout: {
                    scroll: true,
                    footer: false
                },
                rows: {
                    autoHide: false
                },
                sortable: true,
                pagination: false,
                autoWidth: true,
                columns: this.table.data
            });

            return table;

        }
    }


    isExist(element) {
        return !!element.length;
    }


    getData(element, data) {
        return element.data(data)
    }

    getButtons(buttons) {
        let formattedButtons = ``;
        data.map(function (value) {

            switch (value.processType) {
                case "delete":
                    buttons += `
              <button type="button" onclick="deleteModal('${value.route}')" class="btn btn-${value.type} btn-delete btn-sm">
                 <i class="fa ${value.icon}"></i>
              </button>
              `
                    break;
                default:
                    formattedButtons += `
              <a ${value.target && 'target="_blank"'} class="btn btn-${value.type} btn-sm" href="${value.route}">
                 <i class="fa ${value.icon}"></i> <b>${value.text ? value.text : ''}</b>
              </a>
              `
            }

        });

        return formattedButtons
    }


    deleteModal(action) {
        let modal = $('#deleteModal');
        modal.find('#delete-form').attr('action', action);
        modal.modal('show');
    }


    secondsToDhms(seconds, translate = null) {
        seconds = Number(seconds);
        let d = Math.floor(seconds / (3600 * 24));
        let h = Math.floor(seconds % (3600 * 24) / 3600);
        let m = Math.floor(seconds % 3600 / 60);
        let s = Math.floor(seconds % 60);

        let dDisplay = d > 0 ? d + " " + (translate?.day ? translate.day : 'day') + ", " : "";
        let hDisplay = h > 0 ? h + " " + (translate?.hour ? translate.hour : 'hour') + ', ' : "";
        let mDisplay = m > 0 ? m + " " + (translate?.minute ? translate.minute : 'minute') + ', ' : "";
        let sDisplay = s > 0 ? s + " " + (translate?.second ? translate.second : 'second') + ', ' : "";

        return dDisplay + hDisplay + mDisplay + sDisplay;
    }
}

const dtHelper = new datatableHelper();
