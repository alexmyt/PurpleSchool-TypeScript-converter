import { resolve } from 'path'
import { FfmpegBuilder } from './ffmpeg.builder'

describe('FFMpeg builder', () => {
  test('default build', () => {
    const sourceFilePath = 'src'

    const expectedArgs = ['-v', 'warning', '-i', resolve(sourceFilePath), '-c:v',
      'libx264',
      '-s', '1920x1080', resolve(`out-${sourceFilePath}`)
    ]

    const res = new FfmpegBuilder(sourceFilePath).build()
    expect(res.command).toBe('ffmpeg')
    expect(res.args).toStrictEqual(expectedArgs)
  })

  test('set width', () => {
    const sourceFilePath = 'src'
    const targetWidth = 100

    const expectedArgs = ['-v', 'warning', '-i', resolve(sourceFilePath), '-c:v',
      'libx264',
      '-s', `${targetWidth}x1080`, resolve(`out-${sourceFilePath}`)
    ]

    const res = new FfmpegBuilder(sourceFilePath).width(targetWidth).build()
    expect(res.command).toBe('ffmpeg')
    expect(res.args).toStrictEqual(expectedArgs)
  })
})
