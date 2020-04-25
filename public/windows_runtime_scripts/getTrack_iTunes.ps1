# I don't know why this works, and I don't care. It fixes Unicode (espeically CJK) so yoloooooo
$OutputEncoding = [console]::InputEncoding = [console]::OutputEncoding = New-Object System.Text.UTF8Encoding;

$iTunes = New-Object -ComObject iTunes.Application;

$properties = @{
  name = $iTunes."CurrentTrack"."Name";
  artist = $iTunes."CurrentTrack"."Artist";
  playerState = if ([System.Convert]::ToBoolean($iTunes."PlayerState")) { "playing" } else { "stopped" };
};
$out = New-Object PSObject -Property $properties;

Write-Output ($out | ConvertTo-Json);
