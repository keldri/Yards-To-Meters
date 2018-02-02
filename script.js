// Converts Yards to Meters in PDP, Cart, Checkout, CMS: Order History
function convertYardsToMeters() {
    var $orderTable = $('.quantity-output');
    var $yards  = $('.qty--yards');
    var $meters  = $('.qty--meters');
    var $unitOption = $('.measurement-options');
    var $popup = $('.popup-yardsToMeter')

    // Cart, Checkout, Order History: Convert qty to meters based on yards qty
    if ($orderTable.length > 0) {
        $yards.each(function() {
            var $rowYards = jQuery(this);
            var $rowMeters = $rowYards.next(jQuery('.qty--meters'));
            
            // If yards qty is wrapped in input pass value and if yards qty is text parse to number and output.
            var valueStr = parseFloat($rowYards.text()) || $rowYards.val();
            var text = (valueStr * 0.9144).toFixed(3);
            
            // On input change, covert meters value to meters based on input value
            $rowMeters.show().text("( " + text + " M )");
            $rowYards.on('blur', function(event) {
                var rounded = (Math.ceil($rowYards.val() * 4) / 4).toFixed(2);
                var quarter = $rowYards.val() % .25;
                
                // If backspace or delete key pressed, don't convert or round
                if (event.keyCode == 8 || event.keyCode == 46) {
                    return;
                } 

                // If not a quarter yard, round to the next nearest quarter and convert to meters
                var isQuarter = $rowYards.val() % .25 === 0;

                if (!isQuarter) {
                    $rowYards.val(rounded);
                }

                // Convert Yards to meters
                $rowMeters.text("( " + ($rowYards.val() * 0.9144).toFixed(3) + " M )");               
            });
        }); 
    } else {
        // For each Popup (Orders or Reserves popup)
        $popup.each(function() {
            var $popupYards = $(this).closest('.popup').find('.qty--yards');
            var $popupMeters = $(this).closest('.popup').find('.qty--meters');

            // PDP Toggle Yards and Meters input based on select/dropdown option
            $unitOption.on('change', function() {
                var $this = $(this);
                var $unitOptionYards = $(this).closest('.popup').find('.qty--yards');
                var $unitOptionMeters = $(this).closest('.popup').find('.qty--meters');

                if ($this.val() === 'yards') {
                    $unitOptionYards.addClass('active');
                    $unitOptionMeters.removeClass('active');
                } else {
                    $unitOptionYards.removeClass('active');
                    $unitOptionMeters.addClass('active');
                }
            });

            // PDP: On input change, covert meters value to meters based on input value
            $popupYards.on('blur', function(event) {
                
                // If backspace or delete key pressed, don't convert or round
                if (event.keyCode == 8 || event.keyCode == 46) {
                    return;
                } 

                var rounded = Math.ceil($popupYards.val() * 4) / 4;
                if (rounded > $popupYards.val()) {
                    $popupYards.val(rounded);
                }
                $popupMeters.val(($popupYards.val() * 0.9144).toFixed(3));
            });

            $popupMeters.on('blur', function() {
                var roundedMeters = Math.ceil(($popupMeters.val() / 0.9144) * 4) / 4;
                $popupYards.val(roundedMeters);
            });
        });    
    }    
}

convertYardsToMeters();