<?php global $siteDir;?>
<script async src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script><?php $inlinejs = file_get_contents($siteDir.'/js/inline-load.js'); dirReplacer($inlinejs);?></script>
</body>
</html>
