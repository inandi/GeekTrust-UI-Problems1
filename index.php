<!DOCTYPE html>
<html>
<head>
   <?php include_once('common/css_vendor.php'); ?>
   <link rel="stylesheet" type="text/css" href="<?php echo BASE_URL; ?>assets/g_index.css">
   <title><?php echo PROJECT; ?> | Home</title>
</head>
<body>
   <?php include_once('common/header.php'); ?>
   <div class="container">
      <div class="col-md-12">
         <div class="col-md-9">
            <div class="well text-align-center-custom">Select planets you want to search in</div>
            <div class="col-md-12">
               <div class="col-md-3 mission-traffic">
                  <div class="form-group text-align-center-custom">
                     <label for="sel1">Destination 1:</label>
                     <select class="form-control mission-planet" name="mission-planet-1">
                     </select>
                  </div>
                  <div class="form-group" data-vehicle-attr="vehicle-box-1" data-related-planet-selector="mission-planet-1">
                  </div>
               </div>
               <div class="col-md-3 mission-traffic">
                  <div class="form-group text-align-center-custom">
                     <label for="sel1">Destination 2:</label>
                     <select class="form-control mission-planet" name="mission-planet-2">
                     </select>
                  </div>
                  <div class="form-group" data-vehicle-attr="vehicle-box-2" data-related-planet-selector="mission-planet-2">
                  </div>
               </div>
               <div class="col-md-3 mission-traffic">
                  <div class="form-group text-align-center-custom">
                     <label for="sel1">Destination 3:</label>
                     <select class="form-control mission-planet" name="mission-planet-3">
                     </select>
                  </div>
                  <div class="form-group" data-vehicle-attr="vehicle-box-3" data-related-planet-selector="mission-planet-3">
                  </div>
               </div>
               <div class="col-md-3 mission-traffic">
                  <div class="form-group text-align-center-custom">
                     <label for="sel1">Destination 4:</label>
                     <select class="form-control mission-planet" name="mission-planet-4">
                     </select>
                  </div>
                  <div class="form-group" data-vehicle-attr="vehicle-box-4" data-related-planet-selector="mission-planet-4">
                  </div>
               </div>
            </div>
            <div class="col-md-12">
               <div class="text-align-center-custom" style="margin-top: 20px;">
                  <button type="button" class="btn btn-default find-falcone-button" disabled onclick="save()">Find Falcone!</button>
               </div>
            </div>
         </div>
         <div class="col-md-3">
            <div class="well text-align-center-custom">
               <h3>Time taken : <span class="time-text">-</span></h3>
            </div>
         </div>
      </div>
   </div>
   <?php include_once('common/footer.php'); ?>
   <script src="<?php echo BASE_URL; ?>assets/g_index.js"></script>
</body>
</html>